from django.urls import path
from . import views


urlpatterns = [
    # path('recommend/', views.recommend),
    path('recommend/kids/<str:gu_name>/', views.kid_recommend),
    path('recommend/study/<str:gu_name>/', views.study_recommend),
    path('recommend/play/<str:gu_name>/', views.play_recommend),
    path('recommend/cafebar/<str:gu_name>/', views.cafebar_recommend),
    path('recommend/coffee/<str:gu_name>/', views.coffee_recommend),
    path('recommend/machine/<str:gu_name>/', views.machine_recommend),
    path('recommend/dessert/<str:gu_name>/', views.dessert_recommend),
    path('recommend/study/<str:gu_name>/', views.study_recommend),
    # path('recommend/<str:gu_name>/', views.recommend)
]
