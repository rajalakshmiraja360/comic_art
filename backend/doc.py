def generate_dialogue(outline: list, character_name: str, tone: str) -> list:
    """
    Generates dialogue and narration for each panel in the outline.
    (Mock implementation)
    """
    dialogue_script = []
    for panel in outline:
        dialogue_script.append({
            "panel": panel["panel_number"],
            "caption": f"[{tone.upper()}] The journey of {character_name} continues...",
            "speech": f"{character_name}: 'I must keep going!'"
        })
    return dialogue_script
