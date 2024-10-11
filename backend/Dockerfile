FROM python:3.11-alpine

RUN pip install django

ENV settings=backend.settings

COPY . /backend

WORKDIR /backend

RUN pip install -r requirements.txt

RUN python manage.py collectstatic --noinput

EXPOSE 8000

# Start the Django application using Gunicorn
CMD ["gunicorn", "-c", "gunicorn_config.py", "backend.wsgi:application"]