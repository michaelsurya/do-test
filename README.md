# Digit Owl Selection Test
 
 ---
 
**GraphQL Schema-first**
 - I used GraphQL Code Gen along with the typescript-mongodb plugin to generate the types based on my schema, which then is used as the type in my typescript.

---

**Case where repository layer is directly used**
<p> I bypass the service (usecase) layer when there is no need to authorise / authenticate. Basically for the public route, which in this project is where I query the products</p>

