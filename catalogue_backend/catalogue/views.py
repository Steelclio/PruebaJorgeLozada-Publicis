from django.http import JsonResponse
from .models import Category, Page, Copy

def categories_list(request):
    categories = list(Category.objects.all().values())
    return JsonResponse(categories, safe=False)

def pages_list(request):
    pages = list(Page.objects.all().select_related('category').values(
        'id', 'medio', 'fecha', 'category__name', 'spots', 'src_link', 'processing'
    ))
    return JsonResponse(pages, safe=False)

def copies_list(request):
    copies = list(Copy.objects.all().select_related('category').values(
        'id', 'medio', 'fecha', 'marca', 'producto', 'version', 'programa', 'hora', 
        'vehiculo', 'anunciante', 'tema', 'category_id', 'processing', 'file'
    ))
    return JsonResponse(copies, safe=False)



