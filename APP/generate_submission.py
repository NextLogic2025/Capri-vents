from pathlib import Path
root = Path(r"c:\Users\Denis\Desktop\APP")
files = [
    ("frontend/context/AppContext.js", "javascript"),
    ("frontend/Vendedor/navigation/VendedorTabNavigator.js", "javascript"),
    ("frontend/Vendedor/components/VendedorOrderCard.js", "javascript"),
    ("frontend/Vendedor/components/VendedorCobroCard.js", "javascript"),
    ("frontend/Vendedor/screens/VendedorPedidosScreen.js", "javascript"),
    ("frontend/Vendedor/screens/VendedorCobrosScreen.js", "javascript"),
    ("frontend/Vendedor/screens/VendedorProductosScreen.js", "javascript"),
    ("frontend/Vendedor/screens/VendedorPerfilScreen.js", "javascript"),
    ("App.js", "javascript"),
]
parts = []
for rel, lang in files:
    text = (root / rel).read_text()
    parts.append(f"/// FILE: {rel}\n```{lang}\n{text}\n```\n\n")
(root / "submission.txt").write_text("".join(parts))
