<!--

This source file is part of the Stanford Spezi open source project

SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT

-->

# Color tokens reference

This document provides a reference for the semantic color tokens used in the study platform. Each token is designed to express a specific visual intent, ensuring consistency and clarity across the user interface. Learn more about the design of the [semantic color token system](../explanations/styling.md#semantic-color-tokens).

## Global Tokens

### Background

These styles apply to the background color of an element, typically used for larger areas like the main content area or sidebars.

#### Default

##### Primary

- `bg`: Used for the main background of the application, providing a neutral base for content.
- `bg-hover`: Used to style the hover state of elements that sit on the primary background.
- `bg-active`: Used to style the active state of elements that sit on the primary background.

##### Secondary

- `bg-secondary`: Used for secondary backgrounds, such as sidebars or secondary content areas, providing a subtle yet distinct visual separation from the primary background.
- `bg-secondary-hover`: Used to style the hover state of elements that sit on a secondary background.
- `bg-secondary-active`: Used to style the active state of elements that sit on a secondary background.

#### Examples

```tsx
<Layout>
  <Sidebar className="bg-bg-secondary">
    <SidebarItem className="hover:bg-bg-secondary-hover active:bg-bg-secondary-active" />
  </Sidebar>
  <MainContent className="bg-bg">
    <GhostButton className="hover:bg-bg-hover active:bg-bg-active" />
  </MainContent>
</Layout>
```

### Layer

These styles apply to larger elements that sit on top of the background, such as cards, panels, or other "container-like" UI components that require a distinct visual separation from the background.

#### Default

##### Primary

- `layer`: Used for elements that sit on the primary background, such as cards or panels, providing a subtle elevation effect.
- `layer-hover`: Used to style the hover state of elements that sit on the primary layer.

#### Examples

```tsx
<Background className="bg-bg">
  <Card className="bg-layer">
    <GhostButton className="hover:bg-layer-hover" />
  </Card>
</Background>
```

### Fill

These styles apply to smaller elements that require a solid fill color, such as buttons or badges. Fills come with their explicit text colors, called `on-fill` tokens, to ensure good contrast and readability.

#### Default

##### Primary

- `fill`: Used for elements that require a solid neutral fill color that does not express a specific intent and does not fit a particular role.

##### Secondary

- `fill-secondary`: Used for elements that require a solid neutral fill color that does not express a specific intent and is darker than the primary fill color.

##### Tertiary

- `fill-tertiary`: Used for elements that require a solid neutral fill color that does not express a specific intent and is darker than the secondary fill color.

#### Brand

##### Primary

- `fill-brand`: Used for elements that require a solid fill color that draws a lot of attention to an element without conveying a specific context, such as an error or success state.
- `fill-brand-hover`: Used to style the hover state of elements that use the brand fill color.
- `fill-brand-active`: Used to style the active state of elements that use the brand fill color.

#### Info

##### Primary

- `fill-info`: Used for elements that require a solid fill color that indicates informational content or commands a little bit of attention. It should be used to put emphasis on elements that don't require action but still need to be noticed.

#### Success

##### Primary

- `fill-success`: Used for elements that require a solid fill color that indicates a successful or positive action or state, such as a completed task or successful submission.

#### Warning

##### Primary

- `fill-warning`: Used for elements that require a solid fill color that indicates a warning action or pending state, such as a potential issue or caution.

#### Critical

##### Primary

- `fill-critical`: Used for elements that require a solid fill color that indicates an error or high importance state, such as a failed action or critical alert.

#### Examples

```tsx
<Table>
  <TableRow className="bg-fill" />
  <TableRow className="bg-fill-secondary" />
  <TableFooter className="bg-fill-tertiary" />
</Table>
```

```tsx
<ModalFooter>
  <Button className="bg-fill-brand hover:bg-fill-brand-hover active:bg-fill-brand-active">
    New Study
  </Button>
</ModalFooter>
```

```tsx
<AvatarRole>
  <AdminIcon className="bg-fill-info" />
</AvatarRole>
```

```tsx
<CardHeader>
  <Badge className="bg-fill-success">Completed</Badge>
</CardHeader>
```

```tsx
<Banner>
  <BannerHeader className="bg-fill-warning">Maintenance Notice</BannerHeader>
</Banner>
```

```tsx
<Popover>
  <PopoverContent className="bg-fill-critical">Error occurred</PopoverContent>
</Popover>
```

### Border

These styles apply to the border or ring color of elements, typically used for outlines or borders around cards, buttons, and other UI components.

#### Default

##### Primary

- `border`: Used for elements that require an unopinionated strong border color to provide visual separation or emphasis without conveying a specific intent.
- `border-focus`: Used to style the border color of elements when they are focused, ensuring good visibility and accessibility.

##### Secondary

- `border-secondary`: Used for elements that require an unopinionated border color that is less prominent than the primary border, providing a subtle visual separation.

##### Tertiary

- `border-tertiary`: Used for elements that require an unopinionated border color that is even less prominent than the secondary border.

#### Info

##### Primary

- `border-info`: Used for elements that require a border color that indicates informational content or commands a little bit of attention, such as an informational card or alert.

#### Examples

```tsx
<Card className="border-border border">
  <CardHeader className="border-border-secondary border-b">
    <Button className="focus-visible:ring-border-focus focus-visible:ring-2" />
  </CardHeader>
  <Table className="divide-border-tertiary divide-y" />
</Card>
```

```tsx
<Alert className="border-border-info border" />
```

### Text

These styles apply to the text color of elements, ensuring good contrast and readability. It should also be used to style the fill or stroke colors of icons and other text-like elements.

#### Default

##### Primary

- `text`: Used for the emphasized texts, such as headings or important labels, providing a strong visual presence.

##### Secondary

- `text-secondary`: Used for basic text around the application, such as body text. This is the default text color for most text elements, providing a neutral and readable appearance.

##### Tertiary

- `text-tertiary`: Used for less emphasized text, such as captions or secondary information, providing a subtler contrast.
- `text-tertiary-hover`: Used for less emphasized text when it is hovered, providing a subtle visual change.

#### On Fill

##### Default

###### Primary

- `text-on-fill`: Used for text that appears on elements with a neutral fill color.

###### Secondary

- `text-secondary-on-fill`: Used for text that appears on elements with a neutral secondary fill color.

###### Tertiary

- `text-tertiary-on-fill`: Used for text that appears on elements with a neutral tertiary fill color.

##### Info

###### Primary

- `text-info-on-fill`: Used for text that appears on elements with a brand fill color.

##### Brand

###### Primary

- `text-brand-on-fill`: Used for text that appears on elements with a brand fill color.

##### Success

###### Primary

- `text-success-on-fill`: Used for text that appears on elements with a success fill color.

##### Warning

###### Primary

- `text-warning-on-fill`: Used for text that appears on elements with a warning fill color.

##### Critical

###### Primary

- `text-critical-on-fill`: Used for text that appears on elements with a critical fill color.

##### Inverted

###### Primary

- `text-inverted-on-fill`: Used for text that appears on elements with an inverted fill color.

##### Examples

```tsx
<Card>
  <Heading className="text-text">Welcome to the Study Platform</Heading>
  <Paragraph className="text-text-secondary">
    Login to access your studies and data.
  </Paragraph>
  <Caption className="text-text-tertiary hover:text-text-tertiary-hover">
    Don't have an account? <Link className="text-text">Sign up</Link>
  </Caption>
</Card>
```

```tsx
<TagGroup>
  <Tag className="bg-fill text-text-on-fill" />
  <Tag className="bg-fill-secondary text-text-secondary-on-fill" />
  <Tag className="bg-fill-tertiary text-text-tertiary-on-fill" />
</TagGroup>
```

```tsx
<Calendar>
  <CurrentDay>
    <NextEvent className="bg-fill-info text-text-info-on-fill" />
  </CurrentDay>
</Calendar>
```

```tsx
<Pagination>
  <ActivePage className="bg-fill-brand text-text-brand-on-fill">1</ActivePage>
</Pagination>
```

```tsx
<CopyButton className="data-[copied=true]:bg-fill-success data-[copied=true]:text-text-success-on-fill" />
```

```tsx
<Badge className="bg-fill-warning text-text-warning-on-fill">
  Check your input
</Badge>
```

```tsx
<Button className="bg-fill-critical text-text-critical-on-fill">
  Delete Study
</Button>
```

```tsx
<Tooltip className="bg-fill-inverted text-text-inverted-on-fill">
  Additional Info
</Tooltip>
```
