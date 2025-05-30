import React, { useState } from 'react';
import { FiHome, FiPieChart, FiBriefcase, FiMail } from 'react-icons/fi';
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';
import SearchMain from '../search/SearchMain';
import { Button } from '../Button';
import { Alert } from '../alert';
import { Badge } from '../badge';
import { Avatar } from '../avatar';
import { ComponentCard } from '../cards';
import { HeadingWithDescription } from '../description';
import { Dropdown, DropdownItem } from '../dropdown';
import { FaqSection } from '../faq-section';
import { DateRangePicker } from '../date range';
import { Modal } from '../modal';
import { Pagination } from '../pagination';
import { ScrollToTop } from '../scroll-to-top';
import { StepperParent } from '../stepper-default';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '../table';
import { Switch } from '../switch';
import { Toast, show as showToast } from '../toast';

const ConsolidatedComponent: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  // Sample data for components
  const menuItems = [
    {
      id: 'home',
      label: 'Home',
      icon: <FiHome className="w-5 h-5" />,
      href: '/home'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: <FiPieChart className="w-5 h-5" />,
      subItems: [
        {
          id: 'business',
          label: 'Business',
          icon: <FiBriefcase className="w-4 h-4" />,
          href: '/analytics/business'
        },
        {
          id: 'marketing',
          label: 'Marketing',
          icon: <FiMail className="w-4 h-4" />,
          href: '/analytics/marketing'
        }
      ]
    }
  ];

  const notifications = [
    {
      id: '1',
      title: 'New Message',
      message: 'You have a new message from John',
      time: '5m ago',
      read: false
    }
  ];

  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://i.pravatar.cc/300'
  };

  const searchData = [
    { name: 'Product 1', description: 'Description for product 1' },
    { name: 'Product 2', description: 'Description for product 2' }
  ];

  const tableData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <HeadingWithDescription
          title="Component Library"
          points={["A showcase of all available components in the Anthers Component Library"]}
        />

        {/* Layout Components */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Layout Components</h2>
          <div className="space-y-6">
            <ComponentCard title="Header">
              <Header
                searchData={searchData}
                onSearch={console.log}
                user={user}
                notifications={notifications}
              />
            </ComponentCard>

            <ComponentCard title="Sidebar">
              <div className="h-96">
                <Sidebar
                  logo={{ src: 'https://via.placeholder.com/150', alt: 'Logo' }}
                  menuItems={menuItems}
                />
              </div>
            </ComponentCard>

            <ComponentCard title="Search">
              <SearchMain
                data={searchData}
                onSearch={console.log}
                placeholder="Search..."
              />
            </ComponentCard>
          </div>
        </section>

        {/* Basic Components */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Basic Components</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ComponentCard title="Buttons">
              <div className="space-x-2">
                <Button variant="primary">Primary</Button>
                <Button variant="outline">Outline</Button>
              </div>
            </ComponentCard>

            <ComponentCard title="Alerts">
              <div className="space-y-2">
                <Alert variant="success" title="Success" message="Success Alert" />
                <Alert variant="error" title="Error" message="Error Alert" />
                <Alert variant="warning" title="Warning" message="Warning Alert" />
              </div>
            </ComponentCard>

            <ComponentCard title="Badges">
              <div className="space-y-4">
                <div className="space-x-2">
                  <h3 className="text-sm font-medium mb-2">Light Variant:</h3>
                  <Badge variant="light" color="brand">Brand</Badge>
                  <Badge variant="light" color="success">Success</Badge>
                  <Badge variant="light" color="error">Error</Badge>
                  <Badge variant="light" color="warning">Warning</Badge>
                  <Badge variant="light" color="info">Info</Badge>
                  <Badge variant="light" color="light">Light</Badge>
                  <Badge variant="light" color="dark">Dark</Badge>
                </div>

                <div className="space-x-2">
                  <h3 className="text-sm font-medium mb-2">Solid Variant:</h3>
                  <Badge variant="solid" color="brand">Brand</Badge>
                  <Badge variant="solid" color="success">Success</Badge>
                  <Badge variant="solid" color="error">Error</Badge>
                  <Badge variant="solid" color="warning">Warning</Badge>
                  <Badge variant="solid" color="info">Info</Badge>
                  <Badge variant="solid" color="light">Light</Badge>
                  <Badge variant="solid" color="dark">Dark</Badge>
                </div>
              </div>
            </ComponentCard>

            <ComponentCard title="Avatars">
              <div className="space-x-2">
                <Avatar src="https://i.pravatar.cc/300" alt="User" />
                <Avatar src="https://i.pravatar.cc/301" alt="JD" />
              </div>
            </ComponentCard>

            <ComponentCard title="Dropdown">
              <div className="relative">
                <Button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="dropdown-toggle">
                  Dropdown
                </Button>
                <Dropdown isOpen={isDropdownOpen} onClose={() => setIsDropdownOpen(false)}>
                  <DropdownItem>Option 1</DropdownItem>
                  <DropdownItem>Option 2</DropdownItem>
                </Dropdown>
              </div>
            </ComponentCard>

            <ComponentCard title="Switch">
              <Switch label="Toggle me" onChange={console.log} />
            </ComponentCard>
          </div>
        </section>

        {/* Advanced Components */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Advanced Components</h2>
          <div className="space-y-6">
            <ComponentCard title="Table">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Role</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tableData.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.role}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ComponentCard>

            <ComponentCard title="Modal">
              <div>
                <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
                <Modal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                >
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Sample Modal</h2>
                    <p>This is a sample modal content.</p>
                  </div>
                </Modal>
              </div>
            </ComponentCard>

            <ComponentCard title="Pagination">
              <Pagination
                currentPage={currentPage}
                totalPages={10}
                onPageChange={setCurrentPage}
              />
            </ComponentCard>

            <ComponentCard title="FAQ Section">
              <FaqSection
                faqs={[
                  {
                    question: 'What is this library?',
                    answer: 'This is the Anthers Component Library, a collection of reusable React components.'
                  },
                  {
                    question: 'How do I install it?',
                    answer: 'You can install it using npm or yarn.'
                  }
                ]}
              />
            </ComponentCard>

            <ComponentCard title="Date Range Picker">
              <div className="relative">
                <Button onClick={() => setIsDatePickerOpen(true)}>Select Date Range</Button>
                <DateRangePicker
                  isOpen={isDatePickerOpen}
                  onClose={() => setIsDatePickerOpen(false)}
                  onRangeSelect={console.log}
                />
              </div>
            </ComponentCard>
          </div>
        </section>

        {/* Utility Components */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Utility Components</h2>
          <div className="space-y-6">
            <ComponentCard title="Toast">
              <Button onClick={() => showToast('This is a toast message')}>
                Show Toast
              </Button>
            </ComponentCard>

            <ComponentCard title="Scroll To Top">
              <ScrollToTop />
            </ComponentCard>

            <ComponentCard title="Stepper">
              <StepperParent
                heading="Progress Steps"
                steps={[
                  { heading: 'Step 1', description: 'Content 1', completed: false },
                  { heading: 'Step 2', description: 'Content 2', completed: false },
                  { heading: 'Step 3', description: 'Content 3', completed: false }
                ]}
              />
            </ComponentCard>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ConsolidatedComponent;
