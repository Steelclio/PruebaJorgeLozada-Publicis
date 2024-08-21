from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=255)

    class Meta:
        db_table = 'categories'

class Page(models.Model):
    medio = models.CharField(max_length=255)
    fecha = models.DateField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE, db_column='category_id')
    spots = models.IntegerField()
    src_link = models.URLField(max_length=200)
    processing = models.BooleanField()

    class Meta:
        db_table = 'pages'

class Copy(models.Model):
    medio = models.CharField(max_length=255, default="Sin medio")
    fecha = models.DateField(default="2024-08-01")
    marca = models.CharField(max_length=255, default="Sin marca")
    producto = models.CharField(max_length=255, default="Sin producto")
    version = models.CharField(max_length=255, default="Sin versión")
    programa = models.CharField(max_length=255, default="Sin programa")
    hora = models.TimeField(default="0")
    vehiculo = models.CharField(max_length=255, default="Sin vehiculo")
    anunciante = models.CharField(max_length=255, default="Desconocido")
    tema = models.CharField(max_length=255, default="Sin tema")
    category = models.ForeignKey(Category, on_delete=models.CASCADE, db_column='category_id', default="0")
    processing = models.BooleanField(default = "No")
    file = models.FileField(upload_to='files/', default="Sin archivo")

    class Meta:
        db_table = 'copys'
