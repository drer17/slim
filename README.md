# Simple Ledger & Investment Management (SLIM)

A simple NextJS, typescript, serverless application for finance and investment management.

A work in progress.

## High Level Requirements

- Simple
- Cheap
- Scalable
- Secure
- Private

## Application Requirements

- Overview
  - User / Asset
    - Profit / Loss
    - Budget Table
    - Pie Chart
    - History Chart
  - _Graph View_
    - Obsidian like graph view
- Tracking / Managing
  - Transaction
    - _Auto Categorisation_
  - Obligation Tracking / Ledgering
- Exporting
  - Reporting
  - Export to CSV
- Notes / Comments
  - Log like note taking
  - Apply to (0:many to one)
    - Docs
    - Asset
    - Transaction
    - Entity
    - Obligation
    - Occurrence
- Attributes
  - Key, Values <String,String>
  - Apply to (0:many to one)
    - Docs
    - Asset
    - Transaction
    - Entity
    - Obligation
    - Occurrence
- Tags
  - Unique searchable tags
  - Apply to (0:many to many)
    - Docs
    - Asset
    - Transaction
    - Entity
    - Obligation
    - Note
    - Occurrence
- Pre Configuration
  - Default user sets up
    - Default Asset Types
    - Default Transaction Categories
    - Default Document Types
- **User**
  - **Create**
    - Assets
      - Value Assets
      - _Apply tags_
      - Add attributes
    - Obligations (+tags +attributes)
      - Bills
      - Mortgage Repayments
      - Salary
      - Rent
    - Transactions for an Account
      - Auto Categorized
      - _Apply tags_
      - Apply transaction towards an obligation
    - Logs or notes to Nodes
    - Documents to Nodes
    - Entities
  - **Read**
    - Obligations for Entities
      - Past / Present
      - Fulfilled / Outstanding
    - Asset Value History
    - Asset Profit / Loss
    - Account Profit / Loss
    - Budget Table
    - Transaction Split
    - Nodes Linked by tags
      - Graph
    - Search

## License

This project is licensed under the GNU License - see the [LICENSE](LICENSE) file for details.
