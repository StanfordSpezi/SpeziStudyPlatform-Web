<!--

This source file is part of the Stanford Spezi open source project

SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT

-->

# About styling and visual grammar

## Purpose and scope

This document captures the reasoning behind the study platform's visual-styling approach, with special focus on the semantic color-token system. It explains why this scheme exists, the benefits it brings, and the trade-offs it introduces.

## Context

The platform targets a broad, mostly non-technical audience that wants to create and manage studies with minimal friction. The standard [spezi-web-design-system](https://github.com/StanfordSpezi/spezi-web-design-system) (SWDS) styles provide a solid baseline, but some adjustments are required to meet the specific UX goals of this project. The styling approach therefore balances two objectives:

1. Reuse of existing SWDS primitives to simplify maintenance and preserve brand alignment.
2. Adaptation where usability for this project would measurably benefit.

## Guiding principles

The following principles guide the design and implementation of the platform’s styling system:

### 1. State intent first

Name design primitives by purpose ("secondary icon", "brand fill") rather than appearance ("blue", "large"). This makes the intent of each token explicit and reduces cognitive load when reading code.

### 2. Single source of design data

Tokens for color, spacing, and typography live in one place. Redundant declarations are avoided.

### 3. Start with design-system defaults, extend only when necessary

New tokens appear only when the existing set cannot express a real UI need.

## Semantic color tokens

The default SWDS palette is intentionally compact to stay beginner-friendly. The study platform, however, requires a more complex set of color tokens to handle different background layers, component states and contexts.

Without a structured token hierarchy these needs would be met by improvised hex values or intentless primitive color tokens sprinkled throughout the codebase. That hidden complexity makes maintenance difficult, especially when updating themes or ensuring accessibility.

To keep intent explicit the platform adopts a semantic token hierarchy, inspired by [Shopify Polaris](https://polaris-react.shopify.com/design/colors), that encodes:

- The physical layer being colored (background, layer, border, text, icon).
- The color’s purpose (brand, success, warning, neutral, etc.).
- Optional interaction states (hover, active, disabled) and prominence levels (primary, secondary, tertiary).

Learn more about each individual token in the [color token reference](../reference/color-tokens.md).

### Naming convention

color-[concept]-[element]-[role]-[prominence]-[state]

| Segment    | Meaning (examples)                                                              |
| ---------- | ------------------------------------------------------------------------------- |
| concept    | Optional domain context such as nav or sidebar . Omitted for global tokens      |
| element    | The physical layer: bg, layer, fill, border, text, icon.                        |
| role       | Why the color exists: default, brand, info, success, caution, warning, critical |
| prominence | Visual strength: primary, secondary, tertiary                                   |
| state      | Interaction state: hover, active, selected, disabled, focus                     |

A token therefore reads like a sentence. Example:
`--color-fill-brand-hover` = _“the hover state of a brand-colored fill”_

### Relationship to SWDS tokens

This repository re-maps essential SWDS tokens ( `--color-surface`, `--color-primary`, …) to the new variables. This keeps SWDS components functional out-of-the-box while granting the study platform finer control where needed.

### Benefits

- Predictability: Designers and engineers can infer the intent of a color from its name alone.
- Accessibility: By pairing text tokens (on-fill variants) with their corresponding backgrounds, color-contrast rules can be audited systematically.
- Easier theming: Theming changes require changing token definitions, not refactoring every component.

### Trade-offs

- Centralization reduces modularity: Centralizing tokens ensures consistency, accessibility, and easier theming across the platform, but it makes components more interdependent.
- Steeper learning curve: Contributors must grasp more design tokens to work effectively. This upfront investment reduces ambiguity and prevents inconsistencies in design and styling patterns.

## Limitations and how they are handled

Even with these rules in place, certain drawbacks remain. The list that follows describes those constraints, why they are acceptable, and strategies to mitigate their impact.

### Token proliferation

A semantic system invites new tokens each time someone spots a nuance. Runaway growth would blur the meaning of existing names. Every new token therefore requires a short explanation of its purpose and how it differs from similar tokens. This keeps the palette manageable and ensures that each token has a clear, distinct role.

### Higher cognitive load

Contributors must learn a larger vocabulary of colors than the standard SWDS palette demands. The trade-off is accepted because once learned, the system removes the need to search for arbitrary hex codes.

## Conclusion

The styling approach adopted by the study platform balances consistency, maintainability, and flexibility. By building upon the existing SWDS and extending it only when necessary, the platform ensures alignment with established design patterns while accommodating specific usability requirements.
