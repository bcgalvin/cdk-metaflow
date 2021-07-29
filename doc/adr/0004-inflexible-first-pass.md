# 4. inflexible-first-pass

Date: 2021-07-29

## Status

Accepted

## Context

Eventually want to have this package be flexible enough to import existing resources or swap out different components (e.g. use serverless aurora instead of rds postgres).

## Decision

Before worrying about infrastructure flexibility want to just get the different infrastructure components working together and follow the existing cloudformation template without making any opinionated changes.

## Consequences

Will make things more straightforward to implement and software boundaries will hopefully become clear after the first pass. This means cfn-nag outlined in adr 0003 will largely be ignored until the next iteration.
