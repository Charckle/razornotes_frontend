VERSION=1.0.0

docker build -t charckle/razornotes_fe:$VERSION .
docker image tag charckle/razornotes_fe:$VERSION  charckle/razornotes_fe:latest
# push it to docker
docker push charckle/razornotes_fe:latest
docker push charckle/razornotes_fe:$VERSION
