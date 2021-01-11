FROM node:10.16.0-alpine
RUN mkdir -p /opt/val
WORKDIR /opt/val
RUN adduser --disabled-password val
COPY ./ .
RUN chown -R val:val /opt/val
USER val
RUN npm install
EXPOSE 3000
CMD [ "npm", "run", "pm2" ]
