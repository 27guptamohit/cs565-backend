class MusicSymbol:
    """
    Class for representing a musical symbol.
    """
    name: str
    pitch: int | None

    def __init__(self, name: str, pitch: int | None = None, **kwargs: None) -> None:
        """
        Constructs a musical symbol.

        Inputs:
            name: str - the name of the symbol, must be one of {whole/half/quarter} x {note/rest}
            pitch: int - the pitch of the symbol, only for notes, in the range 1-9 where 1 is the bottom line, 2 is the bottom space, etc.
        """
        valid_symbol_names = ["whole_note", "half_note", "quarter_note", "whole_rest", "half_rest", "quarter_rest"]
        if name not in valid_symbol_names:
            raise ValueError(f"name was {name}, must be one of {valid_symbol_names}")

        if pitch is None:
            if "note" in name:
                raise ValueError(f"pitch was None, but a note must have a pitch value in the range [1-9]")
        else:
            if "rest" in name:
                raise ValueError(f"pitch was {pitch}, but a rest's pitch must be None")
            elif pitch < 1 or pitch > 9:
                raise ValueError(f"pitch was {pitch}, must be in the range [1-9]")

        self.name = name
        self.pitch = pitch
    
    def __eq__(self, __value: object) -> bool:
        if not isinstance(__value, MusicSymbol):
            return NotImplemented

        return self.name == __value.name and self.pitch == __value.pitch
    
    def __str__(self) -> str:
        return f"{self.name, self.pitch}"
    
    def __repr__(self) -> str:
        return self.__str__()
    
    def __hash__(self) -> int:
        return hash(str(self))
