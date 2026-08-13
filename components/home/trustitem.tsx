export default function TrustItem({
  icon,
  title,
  body,
}: {
  icon: string;
  title: string;
  body: string;
}) {
  return (
    <div className="bg-surface border border-border rounded-card p-7">
      <div className="w-10 h-10 rounded-full bg-accentSoft text-accent flex items-center justify-center font-display font-semibold text-sm mb-4">
        {icon}
      </div>
      <h3 className="font-display font-semibold tracking-tight">{title}</h3>
      <p className="text-textMuted text-sm mt-2 leading-relaxed">{body}</p>
    </div>
  );
}
