MinIO is a High Performance Object Storage released under Apache License v2.0. It is API compatible with Amazon S3 cloud storage service. Use MinIO to build high performance infrastructure for machine learning, analytics and application data workloads.

Docker Container
Stable
docker pull minio/minio
docker run -p 9000:9000 minio/minio server /data
Edge
docker pull minio/minio:edge
docker run -p 9000:9000 minio/minio:edge server /data
NOTE: Docker will not display the default keys unless you start the container with the -it(interactive TTY) argument. Generally, it is not recommended to use default keys with containers. Please visit MinIO Docker quickstart guide for more information here

macOS
Homebrew (recommended)
Install minio packages using Homebrew

brew install minio/stable/minio
minio server /data
NOTE: If you previously installed minio using brew install minio then it is recommended that you reinstall minio from minio/stable/minio official repo instead.

brew uninstall minio
brew install minio/stable/minio
Binary Download
Platform	Architecture	URL
Apple macOS	64-bit Intel	https://dl.min.io/server/minio/release/darwin-amd64/minio
chmod 755 minio
./minio server /data
GNU/Linux
Binary Download
Platform	Architecture	URL
GNU/Linux	64-bit Intel	https://dl.min.io/server/minio/release/linux-amd64/minio
wget https://dl.min.io/server/minio/release/linux-amd64/minio
chmod +x minio
./minio server /data
Platform	Architecture	URL
GNU/Linux	ppc64le	https://dl.min.io/server/minio/release/linux-ppc64le/minio
wget https://dl.min.io/server/minio/release/linux-ppc64le/minio
chmod +x minio
./minio server /data
Microsoft Windows
Binary Download
Platform	Architecture	URL
Microsoft Windows	64-bit	https://dl.min.io/server/minio/release/windows-amd64/minio.exe
minio.exe server D:\Photos
FreeBSD
Port
Install minio packages using pkg, MinIO doesn't officially build FreeBSD binaries but is maintained by FreeBSD upstream here.

pkg install minio
sysrc minio_enable=yes
sysrc minio_disks=/home/user/Photos
service minio start
Install from Source
Source installation is only intended for developers and advanced users. If you do not have a working Golang environment, please follow How to install Golang. Minimum version required is go1.13

GO111MODULE=on go get github.com/minio/minio
Allow port access for Firewalls
By default MinIO uses the port 9000 to listen for incoming connections. If your platform blocks the port by default, you may need to enable access to the port.

iptables
For hosts with iptables enabled (RHEL, CentOS, etc), you can use iptables command to enable all traffic coming to specific ports. Use below command to allow access to port 9000

iptables -A INPUT -p tcp --dport 9000 -j ACCEPT
service iptables restart
Below command enables all incoming traffic to ports ranging from 9000 to 9010.

iptables -A INPUT -p tcp --dport 9000:9010 -j ACCEPT
service iptables restart
ufw
For hosts with ufw enabled (Debian based distros), you can use ufw command to allow traffic to specific ports. Use below command to allow access to port 9000

ufw allow 9000
Below command enables all incoming traffic to ports ranging from 9000 to 9010.

ufw allow 9000:9010/tcp
firewall-cmd
For hosts with firewall-cmd enabled (CentOS), you can use firewall-cmd command to allow traffic to specific ports. Use below commands to allow access to port 9000

firewall-cmd --get-active-zones
This command gets the active zone(s). Now, apply port rules to the relevant zones returned above. For example if the zone is public, use

firewall-cmd --zone=public --add-port=9000/tcp --permanent
Note that permanent makes sure the rules are persistent across firewall start, restart or reload. Finally reload the firewall for changes to take effect.

firewall-cmd --reload
Test using MinIO Browser
MinIO Server comes with an embedded web based object browser. Point your web browser to http://127.0.0.1:9000 ensure your server has started successfully.