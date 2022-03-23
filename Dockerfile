FROM node:12.13.0 as reacty-build
ENV https_proxy http://buildproxy.ae.sda.corp.telstra.com:3129
ENV http_proxy http://buildproxy.ae.sda.corp.telstra.com:3129
ENV no_proxy localhost,127.0.0.1,10.,127.,.telstra.com,.telstra.com.au
ENV HTTPS_PROXY http://buildproxy.ae.sda.corp.telstra.com:3129
ENV HTTP_PROXY http://buildproxy.ae.sda.corp.telstra.com:3129
ENV NO_PROXY localhost,127.0.0.1,10.,127.,.telstra.com,.telstra.com.au
# ENV https_proxy http://d948490:Define92@bcani.tcif.telstra.com.au:8080;
# ENV http_proxy  http://d948490:Define92@bcani.tcif.telstra.com.au:8080
# ENV no_proxy localhost,127.0.0.1,10.,127.,.telstra.com,.telstra.com.au
# ENV HTTPS_PROXY http://d948490:Define92@bcani.tcif.telstra.com.au:8080;
# ENV HTTP_PROXY  http://d948490:Define92@bcani.tcif.telstra.com.au:8080
# ENV NO_PROXY localhost,127.0.0.1,10.,127.,.telstra.com,.telstra.com.au
 # The container directory where everything will be saved
WORKDIR /app
# Copy from actual source code (relative path given)
#Copy to the the given folder of the container(relative path given again)
COPY . ./
ENV REACT_APP_STAGE production
# RUN yarn config set https-proxy http://d948490:Define92@bcani.tcif.telstra.com.au:8080
RUN yarn config set https-proxy http://buildproxy.ae.sda.corp.telstra.com:3129
RUN yarn config set http-proxy http://buildproxy.ae.sda.corp.telstra.com:3129
# RUN yarn config set http-proxy http://d948490:Define92@bcani.tcif.telstra.com.au:8080
RUN yarn install
# Runs and executes a production build.
RUN yarn run build
 
 
#GETTING A SECOND CONTAINER
FROM nginx:latest
# copy from the above container, from the directory /app/build
# copy into given nginx directoryt
COPY --from=reacty-build /app/build /usr/share/nginx/html/

COPY  nginx.conf /etc/nginx/conf.d/default.conf
#run it on port 80
EXPOSE 80
 
CMD ["nginx", "-g", "daemon off;"]

