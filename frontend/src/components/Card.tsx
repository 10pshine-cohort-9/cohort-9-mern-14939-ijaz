function Card({ children }: { children: any }) {
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md border border-sand p-8">
      {children}
    </div>
  );
}

export default Card;
