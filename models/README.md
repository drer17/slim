# Models

The data is modelled in a relational manner. A hierarchy is defined to generalise behaviour.

## Technologies

- Prisma ORM
- SQLite

## Hierarchy

1. Level 1 (Types)
   - AssetLiabilityType
   - TransactionCategory
1. Level 2
   - AssetLiability
1. Level 3
   - Entities
   - Obligations
1. Level 4
   - Transactions
1. Level 5 (Links to one Table)
   - Occurrence
   - Valuation
1. Level 6 (Links to many Tables)
   - Attribute
1. Level 7 (Links to more Tables)
   - Notes
   - Documents
   - Tag
1. Bespoke
   - ObligationRule

## Rules

createdAt and archivedAt

- Level 2, 3, 4, 5

icon and color

- Level 1, 2, 3
- Occurrence

starred

- Level 2, 3
- Notes

recursive

- Level 2
- TransactionCategory
