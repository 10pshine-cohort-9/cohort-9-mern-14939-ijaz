import type { ReactNode } from "react";

function Card({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-md sm:max-w-lg lg:max-w-xl mx-auto bg-white rounded-lg shadow-md border border-sand p-6 sm:p-8 lg:p-10">
      {children}
    </div>
  );
}

export default Card;
