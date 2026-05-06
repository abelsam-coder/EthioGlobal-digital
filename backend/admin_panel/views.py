from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated,AllowAny

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.pagination import PageNumberPagination
from datetime import timedelta
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.db.models import Q
from django.db.models import Sum
from decimal import Decimal
from .serializers import MessagesSerializer,ProjectSerializer,ClientSerializer

from django.utils import timezone
import requests,os,random, string
from django.contrib.auth import get_user_model
from .models import Otp,Project
from feedback.models import Feedback

User = get_user_model()

import requests


def send_email(to_email, subject, html_content):
    url = "https://api.resend.com/emails"

    headers = {
        "Authorization": f"Bearer {os.getenv('RESEND_API_KEY')}",
        "Content-Type": "application/json",
    }

    data = {
        "from": "EthioGlobal Digital <onboarding@resend.dev>",  
        "to": [to_email],
        "subject": subject,
        "html": html_content,
    }

    response = requests.post(url, json=data, headers=headers)
    return response.json()


class AuthOtp(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        

        email = request.data.get('email')
        user = User.objects.filter(email=email).first()
        check_otp = Otp.objects.filter(email=email).first()
        if check_otp:
            check_otp.delete()  
        if user and user.is_staff:
            otp = str(random.randint(000000,999999))
            send_email(
                to_email=email,
                subject="Your Login Verification Code",
                html_content=render(request, 'otp_code.html', {'otp': otp, 'name': user.first_name}).content.decode('utf-8')
            )
            
            Otp.objects.create(email=email, otp_code=otp)  # Replace with actual OTP generation logic
            return Response({'message': 'Login code sent to your email'})
        else:
            return Response({'error': 'Admin does not exist'},status=400)
        
class VerifyOtp(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        otp_code = request.data.get('otp_code')
        otp_entry = Otp.objects.filter(email=email, otp_code=otp_code).first()
        
        if otp_entry:
            check_date = otp_entry.created_at
            now = timezone.now()
            if now > check_date + timedelta(minutes=5):
                otp_entry.delete()  # OTP expired, delete it
                return Response({'error': 'OTP has expired'})
            else:
                token = RefreshToken.for_user(User.objects.get(email=email))
                response = {
                    'refresh': str(token),
                    'access': str(token.access_token),
                }
                otp_entry.delete()  # OTP is valid, delete it after use
                return Response(response)
            
        else:
            return Response({'error': 'Invalid OTP'})        
        
class AdminInfo(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        if user.is_staff:
            return Response({
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
            })
        else:
            return Response({'error': 'Unauthorized'}, status=403)

class DashboardData(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        client = User.objects.filter(is_staff=False).count()
        message = Feedback.objects.count()
        project = Project.objects.count()
        total_revenue = (
    Project.objects
    .filter(payment='paid')
    .aggregate(total=Sum('money'))['total']
    or Decimal('0.00')

)
        total_pending = (
    Project.objects
    .filter(payment='pending')
    .aggregate(total=Sum('money'))['total']
    or Decimal('0.00')
)
        data = {
            'clients': client,
            'messages': message,
            'projects': project,
            'total_revenue': total_revenue,
        }
        return Response(data)            
# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.db.models import Q  # ✅ For complex queries

from .serializers import MessagesSerializer


class Messages(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            # Get base queryset (all messages)
            messages = Feedback.objects.all()
            
            # ✅ SEARCH FUNCTIONALITY
            search_query = request.query_params.get('search', None)
            
            if search_query:
                # Strip whitespace and validate
                search_query = search_query.strip()
                
                if len(search_query) > 0:
                    # ✅ Search across multiple fields (OR logic)
                    # Case-insensitive contains matching
                    messages = messages.filter(
                        Q(name__icontains=search_query) |      # Search in name
                        Q(email__icontains=search_query) |    # Search in email
                        Q(message__icontains=search_query)   # Search in message content
                    )
                    
                    print(f'🔍 Searching for: "{search_query}" - Found {messages.count()} results')
                else:
                    # Empty search string - return all
                    pass
            
            # Order by newest first
            messages = messages.order_by('-created_at')
            
            # Pagination parameters
            page = request.query_params.get('page', 1)
            
            # Items per page (from query or default to 6 from settings)
            try:
                page_size = int(request.query_params.get('page_size', 6))
                if page_size > 100:
                    page_size = 100  # Max limit for security
                if page_size < 1:
                    page_size = 1
            except (ValueError, TypeError):
                page_size = 6
            
            # Paginate using Django's Paginator
            paginator = Paginator(messages, page_size)
            
            try:
                paginated_messages = paginator.page(page)
                
                # Serialize
                serializer = MessagesSerializer(paginated_messages.object_list, many=True)
                
                # Build response metadata
                response_data = {
                    'success': True,
                    
                    # 📊 Pagination Info
                    'pagination': {
                        'current_page': paginated_messages.number,
                        'total_pages': paginator.num_pages,
                        'total_items': paginator.count,
                        'has_next': paginated_messages.has_next(),
                        'has_previous': paginated_messages.has_previous(),
                        'next_page_number': paginated_messages.next_page_number() if paginated_messages.has_next() else None,
                        'previous_page_number': paginated_messages.previous_page_number() if paginated_messages.has_previous() else None,
                        'items_per_page': page_size,
                        'page_range': list(paginator.page_range)
                    },
                    
                    # 🔍 Search Info (if searching)
                    'search': {
                        'query': search_query,
                        'is_active': bool(search_query and len(search_query.strip()) > 0),
                        'results_count': paginated_messages.paginator.count if (search_query and len(search_query.strip()) > 0) else None
                    } if search_query else None,
                    
                    # 📝 Data
                    'results': serializer.data
                }
                
                return Response(response_data)
                
            except EmptyPage:
                return Response({
                    'success': True,
                    'pagination': {
                        'current_page': int(page) if page else 1,
                        'total_pages': paginator.num_pages,
                        'total_items': paginator.count,
                        'has_next': False,
                        'has_previous': paginator.num_pages > 0,
                        'next_page_number': None,
                        'previous_page_number': paginator.num_pages if paginator.num_pages < int(page) else int(page) - 1,
                        'items_per_page': page_size,
                        'page_range': list(paginator.page_range)
                    },
                    'search': {'query': search_query, 'is_active': True, 'results_count': 0},
                    'results': [],
                    'message': f'No results on page {page}. Try a different page.'
                })
                
            except PageNotAnInteger:
                return Response({
                    'success': True,
                    'pagination': {
                        'current_page': 1,
                        'total_pages': paginator.num_pages,
                        'total_items': paginator.count,
                        'has_next': paginator.num_pages > 1,
                        'has_previous': False,
                        'next_page_number': 2 if paginator.num_pages > 1 else None,
                        'previous_page_number': None,
                        'items_per_page': page_size,
                        'page_range': list(paginator.page_range)
                    },
                    'search': {'query': search_query, 'is_active': True, 'results_count': paginator.count},
                    'results': [],
                    'message': 'Invalid page number. Showing page 1.'
                }, status=400)

        except Exception as e:
            print(f'❌ Messages API Error: {str(e)}')
            import traceback
            traceback.print_exc()
            
            return Response({
                'success': False,
                'error': str(e),
                'results': [],
                'pagination': {
                    'current_page': 1,
                    'total_pages': 0,
                    'total_items': 0,
                    'has_next': False,
                    'has_previous': False
                }
            }, status=500)
        
class Data(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        
        # 📅 Date range (last 30 days)
        end_date = timezone.now()
        start_date = end_date - timedelta(days=30)

        # 📊 Querysets (filtered by last 30 days)
        projects_30d = Project.objects.filter(
            created_at__range=(start_date, end_date)
        )

        clients_30d = User.objects.filter(
            is_staff=False,
            date_joined__range=(start_date, end_date)
        )

        messages_30d = Feedback.objects.filter(
            created_at__range=(start_date, end_date)
        )

        # 💰 Revenue (last 30 days, only paid)
        total_revenue_30d = (
            projects_30d.filter(payment='paid')
            .aggregate(total=Sum('money'))['total']
            or Decimal('0.00')
        )

        # 📦 Response data
        data = {
            "period": {
                "start": start_date,
                "end": end_date
            },

            "summary": {
                "projects_last_30_days": projects_30d.count(),
                "clients_last_30_days": clients_30d.count(),
                "messages_last_30_days": messages_30d.count(),
                "revenue_last_30_days": total_revenue_30d,
            },

            "projects": ProjectSerializer(projects_30d, many=True).data,
            "clients": ClientSerializer(clients_30d, many=True).data,
            "messages": MessagesSerializer(messages_30d, many=True).data,
        }

        return Response(data)
class ClientList(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id=None, *args, **kwargs):
        if id:
            user = User.objects.filter(pk=id).first()
            if not user:
                return Response({'error': "User not found"}, status=404)
            serializer = ClientSerializer(user)
            return Response(serializer.data)
        clients = User.objects.filter(is_staff=False)
        serializer = ClientSerializer(clients, many=True)
        return Response(serializer.data)

    def post(self, request, id=None, *args, **kwargs):
        serializer = ClientSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            send_email(
                to_email=serializer.data['email'],
                subject="Welcome to EthioGlobal Digital",
                html_content=render(
                    request,
                    'welcome_email.html',
                    {'name': serializer.data['first_name']}
                ).content.decode('utf-8')
            )
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    def delete(self, request, id, *args, **kwargs):
        user = User.objects.filter(pk=id).first()
        if user:
            user.delete()
            return Response({'status': "deleted"})
        return Response({'error': "User not found"}, status=404)

class ClientSearch(APIView):
    def get(self, request,*args,**kwargs):
        search = request.query_params.get('search', '')
        users = User.objects.filter(
            Q(is_staff=False) &
            (
                Q(first_name__icontains=search) |
                Q(last_name__icontains=search) |
                Q(username__icontains=search) |
                Q(email__icontains=search)
            )
        )
        serializer = ClientSerializer(users, many=True)
        return Response(serializer.data)

class Projects(APIView):
    def get(self,request):
        data = Project.objects.all()
        serialize = ProjectSerializer(data,many=True)
        return Response(serialize.data)
    def post(self,request):
        data = request.data
        serializer = ProjectSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            
            user = User.objects.filter(pk=serializer.data['client_name']).first()
            send_email(
                to_email=user.email,
                subject="Welcome to EthioGlobal Digital",
                html_content=render(
                    request,
                    'project.html',
                    {'client_name': user.first_name,'project_name':request.data['project_name'],'package_type':request.data['package'],'amount':request.data['money'],'delivery_data':request.data['delivery_date'],'payment_method':request.data['payment_type'],'client_email':user.email,'status':'New'}
                ).content.decode('utf-8')
            )
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    def delete(self,request,id,*args,**kwargs):
        get = Project.objects.filter(pk=id).first()
        get.delete()
        return Response({'status':'deleted'})