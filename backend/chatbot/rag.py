from .data import website_data

def search_data(query):
    query = query.lower()
    results = []

    for item in website_data:
        content = item["content"].lower()
        title = item["title"].lower()

        if any(word in content or word in title for word in query.split()):
            results.append(item)

    # 🔥 ALWAYS include pricing if question is about price
    if "price" in query or "pricing" in query or "cost" in query:
        results += [item for item in website_data if "pricing" in item["title"].lower()]

    return results[:5]