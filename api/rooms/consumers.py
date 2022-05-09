# chat/consumers.py
import json
from pprint import pprint
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer

class ChatConsumer(WebsocketConsumer):
    def connect(self):
        # pprint(self.scope)
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'chat_{self.room_name}'

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        self.accept()
        # async_to_sync(self.channel_layer.group_send)(
        #     self.room_group_name,
        #     {
        #         'type': 'known_user',
        #         'userList': 'hello world'
        #     }
        # )
        
        self.send(text_data=json.dumps({'type': 'connection_established', 'message': 'You are now connected!'}))

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        print('receive text_data_json',text_data_json)

        
        # Send info to room group
        if text_data_json['type'] == 'chat_message':
            message = text_data_json['message']
            username = text_data_json['username']
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    'type': 'chat_message',
                    'username':username,
                    'message': message
                }
            )
        elif text_data_json['type'] == 'known_users':
            userList = text_data_json['userList']
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    'type':'known_users',
                    'userList':userList
                }
            )

    # Receive message from room group
    def chat_message(self, event):
        message = event['message']
        username = event['username']

        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'username':username,
            'message': message
        }))

    # Users
    def known_users(self, event):
        print('known users event: ',event)
        userList = event['userList']
        self.send(text_data=json.dumps({'userList':userList}))
