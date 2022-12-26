https://hub.docker.com/r/johngong/baidupcs-web

docker命令行设置：
下载镜像

docker pull   johngong/baidupcs-web:latest
创建 baidupcs容器

 docker create  \
    --name=baidupcs  \
    -p 5299:5299  \
    -v /配置文件位置:/config  \
    -v /下载位置:/root/Downloads  \
    --restart unless-stopped  \
    johngong/baidupcs-web:latest
运行

docker start baidupcs
停止

docker stop baidupcs
删除容器

docker rm  baidupcs
删除镜像

docker image rm johngong/baidupcs-web:latest
变量:
参数	说明
--name=baidupcs	容器名
-p 5299:5299	BaiduPCS-Go web访问端口,ip:5299
-v /配置文件位置:/config	BaiduPCS-Go配置文件位置
-v /下载位置:/root/Downloads	BaiduPCS-Go默认下载路径
群晖docker设置：
卷
参数	说明
本地文件夹1: /root/Downloads	BaiduPCS-Go默认下载路径
本地文件夹2:/config	BaiduPCS-Go配置文件位置
端口
参数	说明
本地端口1:5299	BaiduPCS-Go web访问端口,ip:本地端口1