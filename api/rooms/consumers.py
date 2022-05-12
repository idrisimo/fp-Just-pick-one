# chat/consumers.py
from collections import UserList
import json
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
        match text_data_json['type']:
            case 'message':
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
            case 'known_users':
                userList = text_data_json['userList']
                async_to_sync(self.channel_layer.group_send)(
                    self.room_group_name,
                    {
                        'type':'known_users',
                        'userList':userList
                    }
                )
            case 'disconnect_user':
                userList = text_data_json['userList']
                disconnectedUser = text_data_json['disconnectedUser']
                async_to_sync(self.channel_layer.group_send)(
                    self.room_group_name,
                    {
                        'type':'disconnect_user',
                        'userList':userList,
                        'disconnectedUser':disconnectedUser
                    }
                )
            case 'selected_movies':
                groupMovies = text_data_json['groupMovies']
                
                async_to_sync(self.channel_layer.group_send)(
                    self.room_group_name,
                    {
                        'type':'selected_movies',
                        'groupMovies':groupMovies,
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

    def disconnect_user(self, event):
        # Leave room group
        print('user disconnected')
        userList = event['userList']
        disconnectedUser = event['disconnectedUser']
        print(type(userList))
        print(disconnectedUser)
        # updated_userList = [obj for obj in userList if not (userList['username'] == disconnectedUser)]
        for i in range(len(userList)):
            if userList[i]['username'] == disconnectedUser:
                del userList[i]
                break
        self.send(text_data=json.dumps({'userList':userList}))

    def selected_movies(self, event):
        groupMovies = event['groupMovies']
        print(groupMovies)
        self.send(text_data=json.dumps({'groupMovies': groupMovies}))
