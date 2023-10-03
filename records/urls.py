from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from rest_framework import routers
from records import views

router = routers.DefaultRouter()
router.register(r"users", views.UserView, "users")
router.register(r"machines", views.MachineView, "machines")
router.register(r"products", views.ProductView, "products")
router.register(r"shifts", views.ShiftView, "shifts")
router.register(r"shiftassignments", views.ShiftAssignmentView, "shiftassignments")
router.register(r"productions", views.ProductionView, "productions")

urlpatterns = [
    path("api/v1/", include(router.urls)),
    path("docs/", include_docs_urls(title="Records API"))
]