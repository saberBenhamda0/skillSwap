FROM python:3.11-alpine

RUN pip install django

ENV settings=backend.settings

COPY . /backend

WORKDIR /backend

RUN pip install -r requirements.txt

EXPOSE 8080

ENTRYPOINT [ "python", "manage.py"]

CMD ["runserver", "0.0.0.0:8080"]
