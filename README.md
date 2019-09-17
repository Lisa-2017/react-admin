### 常用git指令

- 通过create-react-app  react-admin创建项目
- github创建远程仓库
- 来到本地仓库，关联远程仓库
  - git remote add origin xxx
- 将本地仓库代码推送到远程仓库报关
  - 本地先进性版本控制
    - git add . 将工作区的文件全部添加到暂存区
    - git commit -m 'xxx' 将暂存区所有文件添加到版本区进行版本控制
  - git push origin master
  
- 作为开发者：新建一个分支再进行开发
  - git checkout -b dev  新建并切换到dev分支（会将当前分支的代码复制到dev分支上）
- 开发完成，提交代码
  - git add .
  - git commit -m 'xxx'
  - git push origin dev  推送到远程dev分支
  
<<<<<<< HEAD
- 半成品项目，先拉取项目代码
=======
- 拿到半成品项目，先拉取项目代码
>>>>>>> fcf58d77e7295804c6cf0a87ec228865c09fae35
  - git clone xxx     克隆下来的默认只有master主分支，需要dev分支开发时：
  - git fetch origin dev:dev  在仓库里面，拉取远程仓库上的dev重命名为本地dev
  
  - git checkout dev  切换到dev分支
  - 查看分支：gti branch
  - git branch -d dev 删除dev分支
 

