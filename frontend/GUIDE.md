# The foolproof guide to React for Line of Business applications

## 1. Write the view

```tsx
// see: src\contacts\ContactsPage.tsx jsx
```

and put the view in a component

```tsx
export const ContactsPage: FC<{}> = (props) => {
    return (
        <!-- JSX here -->
    )
}
```

## 2. Model the view (view model)

```ts
// see: src\jsonapi\contact.ts *full*
```

## 3. Write the mapping and validation

```ts
// see: src\jsonapi\contact-form-service.ts *full*
```

## 4. Register mapping and validation

todo

## Note

This document contains generated section, to keep it up-to-date

```
.\Format-CodeSnippet.ps1 .\frontend\GUIDE.md
```
