export default function Footer() {
  return (
    <footer>
      <hr />
      <p className="my-5 px-4 text-xs text-gray-400 text-center">
        © {new Date().getFullYear()}, Leonardo Almeida
      </p>
    </footer>
  );
}
