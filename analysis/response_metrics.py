from music_symbol import MusicSymbol

class ResponseMetrics:
    """
    Class for representing a response's performance.
    """

    user_symbols: list[MusicSymbol | None]
    gold_symbols: list[MusicSymbol | None]
    name_match: list[bool | None]
    pitch_match: list[bool | None]
    exact_match: list[bool | None]

    def __init__(self, user_symbols: list[MusicSymbol | None], gold_symbols: list[MusicSymbol | None]) -> None:
        """
        Constructs a response metrics object.

        Inputs:
            user_symbols: list[MusicSymbol | None] - list of the symbols provided by a user, padded to a length of 4 with Nones
            gold_symbols: list[MusicSymbol | None] - list of the correct symbols, padded to a length of 4 with Nones
        """
        self.user_symbols = user_symbols
        self.gold_symbols = gold_symbols
        self.name_match = []
        self.pitch_match = []
        self.exact_match = []
        
        for index in range(4):
            original_symbol = user_symbols[index]
            gold_symbol = gold_symbols[index]

            # agree that symbol does not exist
            if original_symbol is None and gold_symbol is None:
                self.name_match.append(None)
                self.pitch_match.append(None)
                continue

            # disagreement on if symbol exists
            if (original_symbol is None and gold_symbol is not None) \
              or (original_symbol is not None and gold_symbol is None):
                self.name_match.append(False)
                self.pitch_match.append(False)
                continue

            # agree that symbol does exist, check name
            self.name_match.append(original_symbol.name == gold_symbol.name)
            
            if original_symbol.pitch is None and gold_symbol.pitch is None:
                self.pitch_match.append(None)
            else:
                # true if both not none and pitch match
                # false if one is none and other isn't, or nums don't match 
                self.pitch_match.append(original_symbol.pitch == gold_symbol.pitch)
            

        for index in range(4):
            # if both agree that symbol does not exist, skip
            if self.name_match[index] is None and self.pitch_match[index] is None:
                self.exact_match.append(None)
                continue
            
            # name match and pitch is None or match, true
            # else false
            if self.name_match[index] and (self.pitch_match[index] is None or self.pitch_match[index]):
                self.exact_match.append(True)
            else:
                self.exact_match.append(False)
    
    def __str__(self) -> str:
        return f"User symbols: {self.user_symbols}\nGold symbols: {self.gold_symbols}\nName match: {self.name_match}\nPitch match: {self.pitch_match}\nExact match: {self.exact_match}"
    
    def full_symbol_count_match(self) -> bool:
        """
        Checks if the number of symbols in the user's submission and the gold answer are the same.

        Returns:
            True if both have the same number of non-None symbols, False otherwise
        """
        return sum(element is not None for element in self.user_symbols) \
          == sum(element is not None for element in self.gold_symbols)
    
    def full_name_match(self) -> bool:
        """
        Checks if the symbol names in the user's submission and the gold answer are the same.

        Returns:
            True if all non-None symbols have the same name in both, False otherwise
        """
        return all(element != False for element in self.name_match)
    
    def full_pitch_match(self) -> bool | None:
        """
        Checks if the symbol pitches in the user's submission and the gold answer are the same.

        Returns:
            None if there are no pitched symbols
            True if all non-None symbols have the same pitch in both, False otherwise
        """
        # return None if no pitch content (all rests measure)
        if not any(element is not None for element in self.pitch_match):
            return None
        
        return all(element != False for element in self.pitch_match)
    
    def full_exact_match(self) -> bool:
        """
        Checks if the symbols in the user's submission and the gold answer are the same.

        Returns:
            True if all non-None symbols have the same name and pitch in both, False otherwise
        """
        return all(element != False for element in self.exact_match)