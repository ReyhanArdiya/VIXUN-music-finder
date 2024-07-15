FROM zenika/alpine-chrome:with-puppeteer

# ARG MONGODB
# ARG PORT
# ARG CLOUDINARY_API_KEY
# ARG CLOUDINARY_API_SECRET
# ARG CLOUDINARY_CLOUD_NAME
# ARG MONGO_URL
# ARG SESSION_NAME
# ARG SESSION_SECRET
# ARG SPOTIFY_CLIENT_ID
# ARG SPOTIFY_CLIENT_SECRET

# ENV MONGODB=$MONGODB
# ENV PORT=$PORT
# ENV CLOUDINARY_API_KEY=$CLOUDINARY_API_KEY
# ENV CLOUDINARY_API_SECRET=$CLOUDINARY_API_SECRET
# ENV CLOUDINARY_CLOUD_NAME=$CLOUDINARY_CLOUD_NAME
# ENV MONGO_URL=$MONGO_URL
# ENV SESSION_NAME=$SESSION_NAME
# ENV SESSION_SECRET=$SESSION_SECRET
# ENV SPOTIFY_CLIENT_ID=$SPOTIFY_CLIENT_ID
# ENV SPOTIFY_CLIENT_SECRET=$SPOTIFY_CLIENT_SECRET

WORKDIR /app

COPY package.json .
RUN npm install --omit=dev

COPY . .

CMD npm run build:env; npm start