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
<br>


## Release process
1. Merge all working branches into <develop>
2. Pull <develop>
3. Create <release/v0.0.0>
4. Update package.json version
5. Build storybook into docs/
6. Publish on NPM
7. Commit and merge into <master>
8. Add release tag to <master>
9. Merge <master> into <develop>

