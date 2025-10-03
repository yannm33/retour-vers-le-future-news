/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { cn } from "../../lib/utils";
import React, { useRef } from "react";
import {
  motion,
  animate,
  PanInfo,
} from "framer-motion";
 
export const DraggableCardBody = ({
  className,
  children,
  dragConstraintsRef,
  onDrag,
  onDragStart,
}: {
  className?: string;
  children?: React.ReactNode;
  dragConstraintsRef?: React.RefObject<HTMLElement>;
  onDrag?: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
  onDragStart?: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
 
  return (
    <motion.div
      ref={cardRef}
      drag
      dragConstraints={dragConstraintsRef}
      onDrag={onDrag}
      onDragStart={(event, info) => {
        document.body.style.cursor = "grabbing";
        onDragStart?.(event, info);
      }}
      onDragEnd={(event, info) => {
        document.body.style.cursor = "default";
 
        const { velocity } = info;
        const currentVelocityX = velocity.x;
        const currentVelocityY = velocity.y;
 
        const velocityMagnitude = Math.sqrt(
          currentVelocityX * currentVelocityX +
            currentVelocityY * currentVelocityY,
        );
        const bounce = Math.min(0.8, velocityMagnitude / 1000);
 
        animate(info.point.x, info.point.x + currentVelocityX * 0.3, {
          duration: 0.8,
          // @ts-ignore
          ease: [0.2, 0, 0, 1],
          bounce,
          type: "spring",
          stiffness: 50,
          damping: 15,
          mass: 0.8,
        });
 
        animate(info.point.y, info.point.y + currentVelocityY * 0.3, {
          duration: 0.8,
          // @ts-ignore
          ease: [0.2, 0, 0, 1],
          bounce,
          type: "spring",
          stiffness: 50,
          damping: 15,
          mass: 0.8,
        });
      }}
      style={{
        willChange: "transform",
      }}
      whileTap={{ scale: 0.98, cursor: 'grabbing' }}
      className={cn(
        "relative min-h-96 w-80 overflow-hidden rounded-md bg-neutral-100 p-6 shadow-2xl [transform-style:preserve-3d] dark:bg-neutral-900",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};
 
export const DraggableCardContainer = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className={cn("flex items-center justify-center", className)}>{children}</div>
  );
};