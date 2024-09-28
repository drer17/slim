# UI Components

These components have been extracted from the ui-design drawio.

## Global

1. Header
   1. Logo
   1. Current scope selection
   1. Search bar
   1. Notifications dropdown with badge
   1. User avatar dropdown
1. Collapsible Sidebar
   1. Menu Items

## Components

1. Card (Row Level 2 and 3)
   - Two sizes
   - Icon
   - Color
   - Title
   - Secondary Title
   - Primary Information
   - Tags list
   - On hover
   - Expandable (see Framer)
   - Context menu
     - Change Color
     - Star
     - Archive
2. Container (Table Level 5, 6, 7)
   - Expandable (see Framer)
   - Title?
   - Scrollable
3. Datatable (Table Level 2, 3, 4, 5)
   - Hide Columns
     - Hidden column breakpoints (screensize)
   - Filter
   - Lazy Load
   - Sort columns (ASC DSC)
   - Filter columns
     - Column header drop down
     - See material UI data grid
   - Select row opens dialog
   - Select rows
     - Callback actions on selection
       - export
       - auto categorise
       - etc
   - Render jsx in cell
   - Colored cells
   - horizontal and vertical scrolling
   - Editable cells
4. Calendar
5. Graph
6. Plots
   - Pie
   - Line

## Views

1. Dashboard
1. Budget Table
1. Level 2 Table
1. Level 3 Table
1. Datatable
1. Level 2 Row
1. Level 3 Row

# Model to UI

Each model can be represented as a class.

ViewedModel -> Level -> Model

There can be methods to process model specific info to data the view can process.
