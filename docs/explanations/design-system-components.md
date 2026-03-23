<!--

This source file is part of the Stanford Spezi open source project

SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT

-->

# About the integration with the spezi web design system components

## Purpose and scope

This document explains how the study platform integrates components from the [spezi-web-design-system](https://github.com/StanfordSpezi/spezi-web-design-system) (SWDS). It focuses on the principles and guidelines that govern when to use SWDS components as-is, when to customize them, and how the platform co-evolves with the SWDS.

## Context

The study platform consumes the SWDS because that it offers accessible, well-tested components and an emerging visual language for the Spezi web brand. At the same time, the platform must present its own product identity and occasionally satisfy interaction patterns that SWDS does not yet cover. The tension between reuse and customization is the central driver of the decisions captured here.

## Guiding principles

The points below translate the high-level reuse-versus-customization dilemma into concrete, practical rules that govern every styling or component decision.

###  1. Start with the design-system default

Every new screen or feature begins by dropping in the unmodified SWDS component. If the result already fits the design mock-up, nothing further happens. This keeps upgrade paths short and the code surface small.

### 2. Customize only as shallowly as necessary

When the default falls short, the first attempt is always a lightweight fix: an extra utility class, a Tailwind variant or a single CSS override. Deep rewrites or forks are a last resort because they create a new maintenance burden.

### 3. Surface good customizations upstream

If a local override clearly improves the generic experience, an issue or pull request is opened in SWDS. Sharing improvements prevents multiple projects from solving the same problem in isolation.

### 4. Accept minor mismatches when cost outweighs benefit

If a default component is slightly off but still functional, live with the discrepancy and document it rather than create long-term maintenance work.

## Component integration guidelines

Choosing between "use the default" and "customize" can be confusing, especially for new contributors. The framework below maps common scenarios to clear actions. The order reflects precedence: always consider the less disruptive option first.

| Scenario                   | Signs you are in this scenario                                                                             | Recommended action                                             | Rationale                                               |
| -------------------------- | ---------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------- |
| 1. Accept the default      | The SWDS component meets functional needs. Minor spacing or color tweaks are cosmetic.                     | Use as-is, adding only utility classes or small CSS overrides. | Lowest maintenance cost.                                |
| 2. Accept a minor mismatch | The default feels slightly off but still achieves the user outcome (e.g., dropdown alignment preferences). | Live with the discrepancy, document the friction.              | Upgrades remain trivial, avoid premature customization. |
| 3. Improve for everyone    | A local variant is clearly better and useful beyond this project (e.g., an improved button shadow model).  | Implement locally and open an upstream proposal to SWDS.       | Keeps the ecosystem coherent and reduces future drift.  |
| 4. Fork deliberately       | Requirement is unique or fundamentally different (e.g., a highly specialized sidebar component).           | Copy the component into the repo, own the code.                | Makes the fork explicit and contained.                  |

Placing "accept the mismatch" before "improve for everyone" ensures that we don't chase micro-optimisations that add long-term cost.

## Limitations and how they are handled

Even with these rules in place, certain drawbacks remain. The list that follows describes those constraints, why they are acceptable, and strategies to mitigate their impact.

### Component drift

Components may diverge from SWDS over time, especially if local customizations accumulate. To manage this, it is important to only fork or heavily customize components when absolutely necessary. Regularly review local overrides to see if they can be upstreamed or simplified.

### Upstream lag

SWDS may accept proposed improvements on a slower cadence than the platform evolves. Temporary divergence is considered acceptable. Each open proposal is tracked, and local patches are dropped once an official release contains the same fix.

## Conclusion

By starting with SWDS defaults, limiting the depth of customizations, accepting minor mismatches, and upstreaming broadly useful changes, the study platform achieves a balance between product-specific polish and long-term maintainability.
