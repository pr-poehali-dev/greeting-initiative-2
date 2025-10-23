"""
Business: ИИ-чат с Магнусом Карлсеном — обрабатывает сообщения пользователя и генерирует ответы от лица чемпиона мира
Args: event с httpMethod, body (JSON с полем message)
Returns: HTTP response с ответом от Магнуса
"""

import json
import os
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    try:
        body_data = json.loads(event.get('body', '{}'))
        user_message: str = body_data.get('message', '')
        
        if not user_message:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Message is required'}),
                'isBase64Encoded': False
            }
        
        openai_api_key = os.environ.get('OPENAI_API_KEY')
        
        if not openai_api_key:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'reply': 'Извини, сейчас я не могу отвечать. Попроси администратора настроить OpenAI API ключ.'}),
                'isBase64Encoded': False
            }
        
        try:
            from openai import OpenAI
            
            client = OpenAI(api_key=openai_api_key)
            
            response = client.chat.completions.create(
                model='gpt-4o-mini',
                messages=[
                    {
                        'role': 'system',
                        'content': 'Ты — Магнус Карлсен, норвежский гроссмейстер и многократный чемпион мира по шахматам. Ты известен своим стратегическим мышлением, спокойствием и профессионализмом. Отвечай как Магнус: дружелюбно, но уверенно, с акцентом на шахматную стратегию и тактику. Используй простой русский язык. Будь кратким — отвечай не более 2-3 предложений.'
                    },
                    {
                        'role': 'user',
                        'content': user_message
                    }
                ],
                max_tokens=200,
                temperature=0.8
            )
            
            magnus_reply = response.choices[0].message.content
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'reply': magnus_reply}),
                'isBase64Encoded': False
            }
            
        except Exception as openai_error:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'reply': f'Извини, произошла ошибка при обращении к ИИ: {str(openai_error)}'}),
                'isBase64Encoded': False
            }
    
    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Invalid JSON'}),
            'isBase64Encoded': False
        }
