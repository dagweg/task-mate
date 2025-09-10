export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      {children}
    </section>
  );
}
