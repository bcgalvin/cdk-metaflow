# 2. configure-project-using-projen

Date: 2021-07-28

## Status

Accepted

## Context

Setting up a modern javascript/typescript project involves a lot of configuration options to manage.

## Decision

Use [projen](https://github.com/projen/projen). It provides sane defaults and allows for managing the config as code.

## Consequences

Projen will manage  all dependencies, CI, codegen and publishing through the `projenrc.js` file. Will need to resist the urge to manually configure tools that aren't included with projen out of the box.
