//
// This source file is part of the Stanford Spezi open source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { useEffect, useRef, useState } from "react";

/**
 * Hook that sets a flag to true when triggered, then automatically resets it after a timeout
 *
 * @example
 * ```tsx
 * const timedIsSuccess = useTimedFlag(isSuccess, 2000);
 * // Whenever isSuccess is true, timedIsSuccess will be set to true
 * // After 2 seconds, timedIsSuccess will be set to false
 * ```
 */
export const useTimedFlag = (trigger: boolean | undefined, timeout: number) => {
  const [isActive, setIsActive] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    if (trigger) {
      setIsActive(true);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setIsActive(false);
      }, timeout);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [trigger, timeout]);

  return isActive;
};
