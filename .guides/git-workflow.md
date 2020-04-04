# Git Workflow
(inspired by gitflow)

<br>

## Branch Naming
```
From master:
    - hotfix/my-hotfix
From develop:
    - feature/my-feature
    - bugfix/my-bugfix
    - release/v0.0.0
    - critical/my-critical
```
<br>


## Available Branch Merges
```
develop -> feature
develop -> bugfix
develop -> release
develop -> critical

master -> hotfix

feature -> develop
bugfix -> develop
critical -> develop

hotfix -> master
hotfix -> develop

release -> master
release -> develop
```
<br>


## Git Commits Style Guide
```
- capitalize first word
- start is a verb describing what was done
- use WIP for incomplete commits
```

