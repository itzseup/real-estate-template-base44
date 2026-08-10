import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { base44 } from "@/api/base44Client"
import { useAuth } from "@/lib/AuthContext"
import Seo from "@/components/Seo"
import { Plus, Edit2, Trash2, Save, X, LogOut } from "lucide-react"

/**
 * AdminDashboard — self-service panel for the client.
 *
 * The client can add/edit/delete agents and properties directly here
 * without you touching the code. They just need to log in at /login first.
 *
 * To add a new admin user:
 *   1. Go to your Supabase project → Authentication → Users
 *   2. Click "Add User" and enter the client's email + password
 *   3. Share the credentials with the client — they log in at /login
 *
 * Access control: if the user is not authenticated, they are redirected
 * to /login?from=/admin so they can sign in and return.
 * Only users with the admin email (configured below) can access the panel.
 */

// Restrict access to specific email(s). Configure as needed.
const ADMIN_EMAILS = ["rafat@citywalkrealestatellc.com"]

export default function AdminDashboard() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  // Demo login check for development without Supabase
  const supabaseConfigured = !!import.meta.env.VITE_SUPABASE_URL
  const demoLoggedIn = localStorage.getItem("demo_admin_logged_in") === "true"
  const authenticated = user || demoLoggedIn

  // Email-based access control for Supabase auth
  const hasAccess = demoLoggedIn || (user && ADMIN_EMAILS.includes(user.email))

  const [activeTab, setActiveTab] = useState("properties")
  const [properties, setProperties] = useState([])
  const [agents, setAgents] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingItem, setEditingItem] = useState(null)
  const [isCreating, setIsCreating] = useState(false)

  // Redirect to /login if not authenticated
  useEffect(() => {
    if (!authenticated || !hasAccess) {
      navigate("/login", { replace: true, state: { from: "/admin" } })
    }
  }, [authenticated, hasAccess, navigate])

  useEffect(() => {
    if (!authenticated || !hasAccess) return
    loadData()
  }, [authenticated, hasAccess])

  async function loadData() {
    setLoading(true)
    try {
      const [propertiesData, agentsData] = await Promise.all([
        base44.entities.Property.list("-created_date", 100),
        base44.entities.Agent.list("-created_date", 50),
      ])
      setProperties(propertiesData || [])
      setAgents(agentsData || [])
    } catch (error) {
      console.error("Error loading data:", error)
    } finally {
      setLoading(false)
    }
  }

  function handleLogout() {
    if (user) {
      signOut()
    } else if (demoLoggedIn) {
      localStorage.removeItem("demo_admin_logged_in")
    }
    navigate("/login", { replace: true })
  }

  function openCreate(type) {
    if (type === "property") {
      setEditingItem({
        type: "property",
        data: {
          title: "",
          description: "",
          price: "",
          address: "",
          city: "",
          state: "",
          zip_code: "",
          country: "AE",
          bedrooms: "",
          bathrooms: "",
          area_sqft: "",
          property_type: "condo",
          status: "for_sale",
          featured: false,
          agent_id: "",
          image_urls: [],
        },
      })
      setIsCreating(true)
    } else {
      setEditingItem({
        type: "agent",
        data: {
          name: "",
          email: "",
          phone: "",
          bio: "",
          avatar_url: "",
          properties_count: 0,
        },
      })
      setIsCreating(true)
    }
  }

  function openEdit(type, item) {
    setEditingItem({ type, data: { ...item } })
    setIsCreating(false)
  }

  function closeEditor() {
    setEditingItem(null)
    setIsCreating(false)
  }

  async function handleSave() {
    if (!editingItem) return
    const { type, data } = editingItem

    try {
      if (type === "property") {
        if (isCreating) {
          await base44.entities.Property.create(data)
        } else {
          await base44.entities.Property.update(data.id, data)
        }
      } else {
        if (isCreating) {
          await base44.entities.Agent.create(data)
        } else {
          await base44.entities.Agent.update(data.id, data)
        }
      }

      await loadData()
      closeEditor()
    } catch (error) {
      console.error("Error saving:", error)
      alert("There was an error saving. Please try again.")
    }
  }

  async function handleDelete(type, id) {
    if (!confirm("Are you sure you want to delete this item?")) return

    try {
      if (type === "property") {
        await base44.entities.Property.delete(id)
      } else {
        await base44.entities.Agent.delete(id)
      }
      await loadData()
    } catch (error) {
      console.error("Error deleting:", error)
      alert("There was an error deleting. Please try again.")
    }
  }

  function handleInputChange(e) {
    const { name, value, type, checked } = e.target
    const fieldValue = type === "checkbox" ? checked : value
    setEditingItem({
      ...editingItem,
      data: {
        ...editingItem.data,
        [name]: fieldValue,
      },
    })
  }

  function handleImageUrlsChange(e) {
    const urls = e.target.value
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean)
    setEditingItem({
      ...editingItem,
      data: {
        ...editingItem.data,
        image_urls: urls,
      },
    })
  }

  if (!authenticated || !hasAccess || loading) {
    return (
      <div className="min-h-screen bg-white py-24 md:py-40">
        <div className="max-w-[1400px] mx-auto px-[4%] md:px-[2%]">
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-2 border-border border-t-accent rounded-full animate-spin" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white py-12 md:py-24 px-[4%] md:px-[2%]">
      <Seo
        title="Admin Dashboard"
        description="Self-service admin panel for managing properties and agents."
        url="/admin"
        noIndex
      />

      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-display-xl font-light">Admin Dashboard</h1>
          <div className="flex items-center gap-3">
            {!editingItem && (
              <button
                onClick={() => openCreate(activeTab === "properties" ? "property" : "agent")}
                className="flex items-center gap-2 px-4 py-2 bg-forest text-white font-body text-xs tracking-label uppercase hover:bg-forest/90 transition-colors"
              >
                <Plus size={16} />
                Add New {activeTab === "properties" ? "Property" : "Agent"}
              </button>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 border border-border text-foreground font-body text-xs tracking-label uppercase hover:bg-secondary transition-colors"
              title="Sign out"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border">
          <button
            onClick={() => setActiveTab("properties")}
            className={`font-body text-xs tracking-label uppercase pb-3 px-1 transition-colors ${
              activeTab === "properties"
                ? "text-forest border-b-2 border-forest"
                : "text-muted-foreground hover:text-forest"
            }`}
          >
            Properties ({properties.length})
          </button>
          <button
            onClick={() => setActiveTab("agents")}
            className={`font-body text-xs tracking-label uppercase pb-3 px-1 transition-colors ${
              activeTab === "agents"
                ? "text-forest border-b-2 border-forest"
                : "text-muted-foreground hover:text-forest"
            }`}
          >
            Agents ({agents.length})
          </button>
        </div>

        {/* Editor Modal */}
        {editingItem && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h2 className="font-display text-xl">
                  {isCreating ? "Add New" : "Edit"} {editingItem.type === "property" ? "Property" : "Agent"}
                </h2>
                <button onClick={closeEditor} className="p-2 hover:bg-secondary rounded">
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 space-y-4">
                {editingItem.type === "property" ? (
                  <>
                    <div>
                      <label className="block font-body text-xs tracking-label uppercase text-muted-foreground mb-2">
                        Title *
                      </label>
                      <input
                        type="text"
                        name="title"
                        required
                        value={editingItem.data.title}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-border rounded-lg font-body text-sm"
                      />
                    </div>
                    <div>
                      <label className="block font-body text-xs tracking-label uppercase text-muted-foreground mb-2">
                        Price
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={editingItem.data.price}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-border rounded-lg font-body text-sm"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-body text-xs tracking-label uppercase text-muted-foreground mb-2">
                          Bedrooms
                        </label>
                        <input
                          type="number"
                          name="bedrooms"
                          value={editingItem.data.bedrooms}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-border rounded-lg font-body text-sm"
                        />
                      </div>
                      <div>
                        <label className="block font-body text-xs tracking-label uppercase text-muted-foreground mb-2">
                          Bathrooms
                        </label>
                        <input
                          type="number"
                          name="bathrooms"
                          value={editingItem.data.bathrooms}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-border rounded-lg font-body text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block font-body text-xs tracking-label uppercase text-muted-foreground mb-2">
                        Property Type
                      </label>
                      <select
                        name="property_type"
                        value={editingItem.data.property_type}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-border rounded-lg font-body text-sm"
                      >
                        <option value="condo">Condo</option>
                        <option value="house">House</option>
                        <option value="villa">Villa</option>
                        <option value="apartment">Apartment</option>
                        <option value="land">Land</option>
                        <option value="commercial">Commercial</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-body text-xs tracking-label uppercase text-muted-foreground mb-2">
                        Status
                      </label>
                      <select
                        name="status"
                        value={editingItem.data.status}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-border rounded-lg font-body text-sm"
                      >
                        <option value="for_sale">For Sale</option>
                        <option value="for_rent">For Rent</option>
                        <option value="sold">Sold</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-body text-xs tracking-label uppercase text-muted-foreground mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={editingItem.data.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-border rounded-lg font-body text-sm"
                      />
                    </div>
                    <div>
                      <label className="block font-body text-xs tracking-label uppercase text-muted-foreground mb-2">
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={editingItem.data.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-border rounded-lg font-body text-sm"
                      />
                    </div>
                    <div>
                      <label className="block font-body text-xs tracking-label uppercase text-muted-foreground mb-2">
                        Description
                      </label>
                      <textarea
                        name="description"
                        rows={4}
                        value={editingItem.data.description}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-border rounded-lg font-body text-sm resize-none"
                      />
                    </div>
                    <div>
                      <label className="block font-body text-xs tracking-label uppercase text-muted-foreground mb-2">
                        Image URLs (one per line)
                      </label>
                      <textarea
                        name="image_urls"
                        rows={3}
                        placeholder="https://example.com/image1.jpg"
                        value={editingItem.data.image_urls?.join("\n") || ""}
                        onChange={handleImageUrlsChange}
                        className="w-full px-4 py-3 border border-border rounded-lg font-body text-sm resize-none"
                      />
                      <p className="font-body text-xs text-muted-foreground mt-1">
                        Get image URLs from your image host or CDN. The first URL
                        becomes the featured image.
                      </p>
                    </div>
                    <div className="flex items-center gap-2 pt-2">
                      <input
                        type="checkbox"
                        name="featured"
                        checked={editingItem.data.featured}
                        onChange={handleInputChange}
                      />
                      <label className="font-body text-sm text-foreground">
                        Feature this property on the homepage
                      </label>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block font-body text-xs tracking-label uppercase text-muted-foreground mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={editingItem.data.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-border rounded-lg font-body text-sm"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-body text-xs tracking-label uppercase text-muted-foreground mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={editingItem.data.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-border rounded-lg font-body text-sm"
                        />
                      </div>
                      <div>
                        <label className="block font-body text-xs tracking-label uppercase text-muted-foreground mb-2">
                          Phone
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={editingItem.data.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-border rounded-lg font-body text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block font-body text-xs tracking-label uppercase text-muted-foreground mb-2">
                        Bio
                      </label>
                      <textarea
                        name="bio"
                        rows={4}
                        value={editingItem.data.bio}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-border rounded-lg font-body text-sm resize-none"
                      />
                    </div>
                    <div>
                      <label className="block font-body text-xs tracking-label uppercase text-muted-foreground mb-2">
                        Photo URL
                      </label>
                      <input
                        type="url"
                        name="avatar_url"
                        placeholder="https://example.com/photo.jpg"
                        value={editingItem.data.avatar_url}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-border rounded-lg font-body text-sm"
                      />
                    </div>
                    <div>
                      <label className="block font-body text-xs tracking-label uppercase text-muted-foreground mb-2">
                        Properties Count
                      </label>
                      <input
                        type="number"
                        name="properties_count"
                        value={editingItem.data.properties_count}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-border rounded-lg font-body text-sm"
                      />
                    </div>
                  </>
                )}
              </div>
              <div className="p-6 border-t border-border flex justify-end gap-3">
                <button
                  onClick={closeEditor}
                  className="px-4 py-2 bg-secondary font-body text-xs tracking-label uppercase hover:bg-secondary/80 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 bg-forest text-white font-body text-xs tracking-label uppercase hover:bg-forest/90 transition-colors"
                >
                  <Save size={16} />
                  {isCreating ? "Create" : "Update"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* List View */}
        {!editingItem && (
          <>
            {activeTab === "properties" && (
              <div className="space-y-4">
                {properties.length === 0 ? (
                  <p className="font-body text-muted-foreground py-8 text-center">
                    No properties yet. Add one to get started.
                  </p>
                ) : (
                  properties.map((property) => (
                    <div
                      key={property.id}
                      className="border border-border/20 rounded-lg p-4 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        {property.featured_image && (
                          <img
                            src={property.featured_image}
                            alt={property.title}
                            className="w-16 h-16 object-cover rounded"
                          />
                        )}
                        <div>
                          <h3 className="font-display text-lg">{property.title}</h3>
                          <p className="font-body text-sm text-muted-foreground">
                            {property.city} · {property.property_type} ·{" "}
                            {property.price
                              ? `$${property.price.toLocaleString()}`
                              : "Price on request"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEdit("property", property)}
                          className="p-2 text-muted-foreground hover:text-forest"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete("property", property.id)}
                          className="p-2 text-muted-foreground hover:text-destructive"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === "agents" && (
              <div className="space-y-4">
                {agents.length === 0 ? (
                  <p className="font-body text-muted-foreground py-8 text-center">
                    No agents yet. Add one to get started.
                  </p>
                ) : (
                  agents.map((agent) => (
                    <div
                      key={agent.id}
                      className="border border-border/20 rounded-lg p-4 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        {agent.avatar_url && (
                          <img
                            src={agent.avatar_url}
                            alt={agent.name}
                            className="w-16 h-16 object-cover rounded-full"
                          />
                        )}
                        <div>
                          <h3 className="font-display text-lg">{agent.name}</h3>
                          <p className="font-body text-sm text-muted-foreground">
                            {agent.email || agent.phone || "No contact details set"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEdit("agent", agent)}
                          className="p-2 text-muted-foreground hover:text-forest"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete("agent", agent.id)}
                          className="p-2 text-muted-foreground hover:text-destructive"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
