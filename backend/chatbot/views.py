from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated,AllowAny
from .rag import search_data
from .groq_service import ask_groq

class ChatView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        message = request.data.get("message", "").lower()

        # 🔥 HANDLE HUMAN REQUEST DIRECTLY
        if "human" in message or "support" in message or "contact" in message:
            return Response({
                "reply": "You can talk to a human by contacting Abel Samuel at abelsamuel841@gmail.com or calling 0957576652. You can also contact Natinael Birhanu at nati@gmail.com or call 0956564545."
            })

        # normal AI flow
        results = search_data(message)
        context = "\n".join([r["content"] for r in results])
        reply = ask_groq(message, context)

        return Response({"reply": reply})