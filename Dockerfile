FROM ubuntu:lasted AS build

RUN apt-get update
RUN apt-get install openjdk-17-jdk -y
COPY . .

RUN apt-get install maven -y
RUN mvn clean install

EXPOSE 8080

COPY --from=build /target/todolist

ENTRYPOINT ["java", "-jar", "app.jar"]