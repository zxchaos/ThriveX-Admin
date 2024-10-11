# 使用官方的Node.js镜像作为基础镜像
FROM node:20-alpine

# 设置工作目录
WORKDIR /thrive

# 复制 package.json 和 package-lock.json
COPY package*.json /thrive/

# 配置 npm 镜像源
RUN npm config set registry https://registry.npmmirror.com

# 安装依赖
RUN npm install

# 复制项目文件
COPY . /thrive

# 构建项目
RUN npm run build

# 使用 Nginx 作为生产环境的基础镜像
FROM nginx:alpine

# 复制构建输出到 Nginx 的默认静态文件目录
COPY --from=builder /app/dist /usr/share/nginx/html

# 复制自定义的 Nginx 配置文件（如果需要）
# COPY nginx.conf /etc/nginx/nginx.conf

# 暴露端口
EXPOSE 9002

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]
