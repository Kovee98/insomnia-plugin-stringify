// stringifies the value of any key in the json object that has 'delimeter' in the key string
function stringify (obj, delimeter) {
    const newObj = JSON.parse(JSON.stringify(obj));
    const visited = new Set();
    const notObject = typeof searchValue !== "object";

    const gvpio = (obj) => {
        for (const [curr, currElem] of Object.entries(obj)) {
            if (curr.includes(delimeter)) {
                const oldKey = String(curr);
                const newKey = oldKey.replace(delimeter, '');
                obj[newKey] = JSON.stringify(currElem);
                delete obj[oldKey];
            }

            // handles objects and arrays the same
            if (typeof currElem === "object") {
                if (visited.has(currElem)) continue;
                visited.add(currElem);
                gvpio(currElem);
                if (notObject) continue;
            }
        }
    }

    gvpio(newObj, "");

    return newObj;
}

module.exports.requestHooks = [
    (context) => {
        const delimeter = '.stringify';
        const body = context.request.getBody();
        const text = body.text || "";

        // no need if body doesn't have any instances of 'delimeter'
        if (text.includes(delimeter)) {
            const payload = JSON.parse(body.text);
            const newPayload = stringify(payload, delimeter);
            context.request.setBody({
                ...body,
                text: JSON.stringify(newPayload),
            });
        }
    }
];
