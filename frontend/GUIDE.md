# The foolproof guide to React for Line of Business applications

## 1. Write the view

```
// see: src\contacts\ContactsPage.tsx jsx
```

and put the view in a component

```
export const ContactsPage: FC<{}> = (props) => {
    return (
        <!-- JSX here -->
    )
}
```

## 2. Model the view (view model)

```
// see: src\jsonapi\contact.ts *full*
```

## 3. Write the mapping and validation

```
// see: src\jsonapi\contact-form-service.ts *full*
```

## 4. Register mapping and validation
