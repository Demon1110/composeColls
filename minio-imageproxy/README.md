# willnorris/imageproxy with minio s3 cache learning


## How to Running

* create bucket

login http://localhost:9000 
bucket:demo (for cache) myimages for demo
dir: images

* upload images to myimages && set policy to public * readonly


* access

`http://localhost:8080/<size>/myimages/<folder>/<imagename>`

http://192.168.8.212:8880/200/http://192.168.8.212:9000/demo/myimages/13702.jpg