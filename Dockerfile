# Use official Nginx image
FROM nginx:alpine

# Copy project files into container
COPY ./ /usr/share/nginx/html

# Expose port
EXPOSE 80
