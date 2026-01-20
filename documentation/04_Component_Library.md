# Component Library

The application uses a set of custom-built, reusable UI components located in `src/components/ui`. These components are designed to be accessible and consistent with the design system.

## Available Components

### Button
- **Path**: `src/components/ui/Button.tsx`
- **Variants**: `primary`, `secondary`, `success`, `warning`, `danger`, `ghost`
- **Sizes**: `sm`, `md`, `lg`
- **Props**: `fullWidth`, `className`, and standard button attributes.
- **Usage**:
  ```tsx
  <Button variant="primary" size="md" onClick={handleClick}>
    Click Me
  </Button>
  ```

### Input
- **Path**: `src/components/ui/Input.tsx`
- **Sizes**: `sm`, `md`, `lg`
- **Props**: `label`, `error`, `required`, `fullWidth`, `inputSize`.
- **Usage**:
  ```tsx
  <Input
    label="Username"
    placeholder="Enter username"
    error={errors.username}
    required
  />
  ```

### Select
- **Path**: `src/components/ui/Select.tsx`
- **Purpose**: Dropdown selection component.

### Checkbox & Radio
- **Path**: `src/components/ui/Checkbox.tsx`, `src/components/ui/Radio.tsx`
- **Purpose**: Selection controls for forms.

### TextArea
- **Path**: `src/components/ui/TextArea.tsx`
- **Purpose**: Multi-line text input.

### Loader
- **Path**: `src/components/ui/Loader.tsx`
- **Props**: `size` (sm, md, lg, xl), `fullScreen` (boolean).
- **Purpose**: Visual indicator for loading states.

### MiniWindow (Modal)
- **Path**: `src/components/ui/MiniWindow.tsx`
- **Props**: `isOpen`, `onClose`, `title`.
- **Purpose**: General purpose modal/dialog window with backdrop blur.

### Tabs
- **Path**: `src/components/ui/Tabs.tsx`
- **Components**: `Tabs` (Root), `TabsList`, `TabTrigger`, `TabsContent`.
- **Purpose**: Switching between different views/content within the same context.
- **Usage**:
  ```tsx
  <Tabs defaultValue="tab1">
    <TabsList>
      <TabTrigger value="tab1">Home</TabTrigger>
      <TabTrigger value="tab2">Settings</TabTrigger>
    </TabsList>
    <TabsContent value="tab1">...</TabsContent>
  </Tabs>
  ```

### Toaster
- **Path**: `src/components/ui/Toaster.tsx`
- **Purpose**: Global notification system.
- **Usage**: Wrap app in `<Toaster>`, use `const { toast } = useToast()`.

## Design Principles
- **Composition**: Components allow passing `className` for overrides but generally rely on props for variants.
- **Accessibility**: Standard HTML attributes are forwarded, and ARIA attributes should be used where necessary.
