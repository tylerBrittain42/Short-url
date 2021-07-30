# Prints 62 bit key needed for url

key = []

# a-z
for i in range(26):
    key.append(chr(i + 97))

# A-Z
for i in range(26):
    key.append(chr(i + 65))

# 0-9
for i in range(10):
    key.append(str(i))

# prints the key so it can easilly be copy pasted
print(key)
