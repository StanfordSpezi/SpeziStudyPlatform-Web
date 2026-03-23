//
// This source file is part of the Stanford Spezi open source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import speziImage from "@/assets/spezi.webp";
import stanfordImage from "@/assets/stanford.webp";
import { FeaturedIconContainer } from "../ui/FeaturedIconContainer";

export const BrandIconGroup = () => {
  return (
    <div className="flex -space-x-2">
      <FeaturedIconContainer className="translate-y-1 -rotate-12">
        <div className="flex-center size-full inset-shadow-sm">
          {/* Compensate the round Spezi Image */}
          <img src={speziImage} alt="Spezi Logo" className="scale-125" />
        </div>
      </FeaturedIconContainer>
      <FeaturedIconContainer className="z-10">
        <div className="flex-center bg-brand-500 text-brand-50 size-full inset-shadow-sm">
          <div className="scale-y-110 font-serif text-2xl font-semibold text-shadow-xs">
            S
          </div>
        </div>
      </FeaturedIconContainer>
      <FeaturedIconContainer className="translate-y-1 rotate-12">
        <div className="flex-center bg-bg size-full inset-shadow-sm">
          <img src={stanfordImage} alt="Stanford Logo" />
        </div>
      </FeaturedIconContainer>
    </div>
  );
};
