# Review TODO

## Top-level files & config
- [ ] README.md
- [x] CITATION.cff / CONTRIBUTORS.md / LICENSE.md / LICENSES/
- [ ] package.json
- [ ] vite.config.ts
- [ ] tsconfig.json
- [ ] eslint.config.js
- [ ] openapi-ts.config.ts
- [x] playwright.config.ts
- [x] index.html

## docs/
- [ ] docs/explanations/ — deployment, design-system-components, dev-server, styling, tech-stack
- [ ] docs/guides/ — add-api-endpoint, e2e-testing-local, installation
- [ ] docs/reference/ — color-tokens, screenshots
- [ ] docs/tutorials/ — development-server

## e2e/
- [ ] e2e/fixtures.ts
- [ ] e2e/auth.spec.ts
- [ ] e2e/basic-info.spec.ts
- [ ] e2e/components.spec.ts
- [ ] e2e/configuration.spec.ts
- [ ] e2e/enrollment.spec.ts
- [ ] e2e/onboarding.spec.ts
- [ ] e2e/router.spec.ts

## images/
- [ ] images/ — screenshots (hero, dashboard, sign-in, components, configuration, enrollment, etc.)

## public/
- [ ] public/ — favicon, silent-check-sso.html

## src/assets/
- [ ] src/assets/ — static images and logos

## src/styles/
- [ ] src/styles/ — global CSS / Tailwind

## src/utils/
- [ ] src/utils/ — cn, createLinkOptions, dedent, enhanceField, iconsData, joinUrlPaths, notImplementedToast, useIsScrolled, useTimedFlag

## src/lib/
- [ ] src/lib/env.ts — Zod-validated env vars
- [ ] src/lib/queryClient.ts — TanStack Query client config
- [ ] src/lib/api/
  - [ ] client.ts — API client + Keycloak auth interceptor
  - [ ] types.ts — type aliases & helpers
  - [ ] transforms.ts — backend ↔ frontend shape converters
  - [ ] generated/ — auto-generated (types.gen, sdk.gen, client.gen, @tanstack query)
- [ ] src/lib/auth/
  - [ ] AuthProvider.tsx
  - [ ] keycloak.ts
- [ ] src/lib/queries/
  - [ ] component.ts
  - [ ] group.ts
  - [ ] study.ts
  - [ ] user.ts
  - [ ] utils.ts

## src/components/ui/
- [ ] src/components/ui/ — reusable UI primitives (Radix wrappers, etc.)

## src/components/layouts/
- [ ] src/components/layouts/ — Dashboard, Error, Onboarding layout wrappers

## src/components/interfaces/
- [ ] src/components/interfaces/Header/ — app header, user dropdowns, group/study selectors
- [ ] src/components/interfaces/Sidebar/ — sidebar navigation
- [ ] src/components/interfaces/CriteriaTreeBuilder/
- [ ] src/components/interfaces/LogicGroupInput/
- [ ] src/components/interfaces/*.tsx — NavigationBlocker, PhonePreview, dialogs, etc.

## src/routes/
- [ ] src/routes/~(auth)/ — sign-in
- [ ] src/routes/~(dashboard)/
  - [ ] ~onboarding/ — onboarding flow
  - [ ] ~$group/~$study/~configuration/
    - [ ] route files — configuration page routes
    - [ ] components/ — ComponentsCard, etc.
    - [ ] lib/ — useScheduleForm, useInformationForm, etc.
    - [ ] ~components/ — component CRUD routes
      - [ ] ~$componentType/ — component type routes
      - [ ] components/ — non-route UI (cards, forms, previews)
